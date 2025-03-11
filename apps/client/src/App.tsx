import globe from './assets/globe.svg'
import arrow from './assets/arrow.svg'
import github from './assets/github.svg'
import { useRecoilState } from 'recoil'
import { countState } from '@repo/store'
import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Button } from '@repo/ui'
function App() {
  return (
    <div className="bg-background w-screen h-svh pb-8">
      <div className="max-w-screen-lg w-full mx-auto h-full font-roboto grid grid-cols-2 pt-[10%]">
        <div>
          <h1 className="text-5xl font-bold text-primary capitalize tracking-[-.0325em] leading-[1.1]">
            create <span className="uppercase">super</span> turbo
          </h1>
          <p className="text-lg text-foreground/70 leading-[28px] tracking-[-0.37px] font-medium my-2">
            Kickstart your React project in a flash with Create Super Turbo!
          </p>
          <ol className="font-mono list-decimal pl-8">
            <li>Get started by editing src/App.tsx.</li>
            <li>Save and see your changes instantly.</li>
          </ol>
          <div className="flex gap-4 my-4">
            <Button asChild>
              <a href="#">Start Building</a>
            </Button>
            <Button asChild variant={'link'} className="gap-1">
              <a href="https://react.dev/" target="_blank">
                <img
                  src={globe}
                  alt="Globe"
                  className="h-4 dark:invert opacity-50 mr-1"
                />
                Go to react.dev
                <img
                  src={arrow}
                  alt="Arrow right"
                  className="h-4 dark:invert"
                />
              </a>
            </Button>
          </div>
        </div>
        <GithubStar />
        <RandomNumberGenerator />
      </div>
    </div>
  )
}
function GithubStar() {
  const { isPending, error, data } = useQuery({
    queryKey: ['repoData'],
    queryFn: () =>
      fetch('https://api.github.com/repos/ofcljaved/chess').then((res) =>
        res.json(),
      ),
  })
  if (isPending)
    return (
      <Button variant={'outline'} className="justify-self-end">
        Loading...
      </Button>
    )
  if (error) return 'An error has occurred: ' + error.message
  return (
    <Button asChild variant={'outline'} className="gap-1 justify-self-end">
      <a
        href="https://github.com/super-turbo-stack/create-super-turbo"
        target="_blank"
      >
        <img src={github} alt="Github" className="h-4 dark:invert" />
        <strong>Star</strong>
        <span className="ml-2">{data.stargazers_count}</span>
      </a>
    </Button>
  )
}
function RandomNumberGenerator() {
  const [count, setCount] = useRecoilState(countState)
  const generateRandomNumber = () => {
    setCount(Math.floor(Math.random() * 1000))
  }
  useEffect(generateRandomNumber, [setCount])
  return (
    <div className="grid place-items-center gap-2 col-span-2 self-start">
      <span>{count}</span>
      <Button variant={'secondary'} onClick={generateRandomNumber}>
        Generate Random Number
      </Button>
    </div>
  )
}
export default App
