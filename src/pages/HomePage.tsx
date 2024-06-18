import React, { useCallback, useMemo, useRef } from 'react'
import { useInfiniteQuery } from "react-query";
import Card from '../components/Card';
import { useNavigate, useParams } from "react-router-dom";
import Loading from '../components/Loading';
import Filter from '../components/Filter';

const MAX_RESULTS = 5;

//Request to get the cats and the user information
const fetchUsersCats = async ({pageParam}: {pageParam: number}, {nationality}: {nationality: string})=>{
  const [response, responseCats] = await Promise.all([
    fetch(`https://randomuser.me/api/?nat=${nationality}&page=${pageParam}&results=${MAX_RESULTS}`),
    fetch(`https://catfact.ninja/facts?limit=${MAX_RESULTS}&page=${pageParam}`)
  ]);

  const { results: todosResults } = await response.json();
  const { data: todosCatsResults } = await responseCats.json();

  // Creation of the array with mixed cat and user information
  const allResult = todosResults.map((accountInfo: any, index: any) => ({
    accountInfo,
    cat: todosCatsResults[index]
  }));

  return allResult;
}

const HomePage = () => {
  const observer = useRef<IntersectionObserver>()
  const navigate = useNavigate();
  // Get id to show only posts for country
  let { id } = useParams();
  const nationality = id ? id :''
  const filters = [
    {nationality: 'us', title: 'United States', url:()=>window.open('/us','_blank')},
    {nationality: 'fr', title: 'France', url:()=>window.open('/fr','_blank') },
    {nationality: 'mx', title: 'Mexico', url:()=>window.open('/mx','_blank')},
  ]

  //infinite scroll implementation
  const {data, error, isLoading, isFetching, hasNextPage, fetchNextPage} = useInfiniteQuery({
    queryKey: ['info'],
    queryFn:({pageParam})=> fetchUsersCats({pageParam}, {nationality}),
    getNextPageParam: (lastPage, allPages)=>{
        return lastPage.length ? allPages.length + 1 : undefined
    }
  })

  //Function to observe the end of the page
  const lastElementRef = useCallback(
    (node:HTMLDivElement)=>{
        if (isLoading) return;

        if(observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver((entries)=>{
            if(entries[0].isIntersecting && hasNextPage && !isFetching){
                fetchNextPage()
            }
        })
        if(node) observer.current.observe(node)
    },
    [fetchNextPage, hasNextPage, isFetching, isLoading]
  )

  // Memoized posts
  const todos = useMemo(()=>{
    return data?.pages.reduce((acc, page)=>{
        return [...acc, ...page];
    },[])
  },[data])

  //loading and error validations
  if(isLoading) return <Loading />
  if(error) return <div className='flex items-center flex-col justify-center h-dvh'><p>Sorry, there was a error. Try again.</p></div>

  return (
    <div className='flex flex-col'>
      <Filter title='See cat posts only from :' filters={filters} />
      <div className='flex items-center flex-col'>
      {
        todos &&
          todos.map((item: any)=>
            // custom component card
            <Card 
              key={item.accountInfo.login.uuid} 
              lastElementRef={lastElementRef} 
              fact={item.cat.fact} 
              name={item.accountInfo.name.first} 
              lastName={item.accountInfo.name.last} 
              photo={item.accountInfo.picture.thumbnail} 
              onClick={()=>navigate(`/detail/${item.accountInfo.login.uuid}`, { state: item })}
            />
          )
      }
      </div>
    </div>
  )
}

export default HomePage
