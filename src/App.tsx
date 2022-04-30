import { useRef, useState } from 'react'
import { Roller } from './components/Roller'

import { api } from './services/api'

import './styles/App.css'
import { LinesOfCodeItem } from './types/LinesOfCodeItem'

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState<LinesOfCodeItem[]>([])

  const inputRef = useRef<HTMLInputElement>(null)

  async function handleSearch() {
    if (!inputRef.current) {
      return
    }

    setIsLoading(true)

    try {
      const { value: githubRepositoryUrl } = inputRef.current

      const githubUsernameAndRepo = githubRepositoryUrl.split('.com/')[1]

      const { data: linesOfCodeItems } = await api.get<LinesOfCodeItem[]>('/loc', {
        params: {
          github: githubUsernameAndRepo
        }
      })

      setData(linesOfCodeItems)
    } catch (err) {
      alert("Fail to load data!")
      // alert(err.response.data)
    }

    setIsLoading(false)
  }

  return (
    <div className="app-container">
      <h1>Lines of Code</h1>
      <h2>Get the lines of code of specified GitHub Repository</h2>

      <div className="search-box">
        <input
          ref={inputRef}
          type="text"
          placeholder="Enter the github public repo url"
        />

        <button
          type="button"
          onClick={handleSearch}
        >
          Search
          {isLoading && <Roller />}
        </button>
      </div>

      <ul className="language-list">
        {data.map((item, index) => (
          <li key={index}>
            <header>
              <h2>{item.language} - {item.linesOfCode}</h2>
            </header>

            <section>
              <span>Files: {item.files}</span>
              <span>Lines: {item.lines}</span>
              <span>Blanks: {item.blanks}</span>
              <span>Comments: {item.comments}</span>
              <span>Lines Of Code(LOC): {item.linesOfCode}</span>
            </section>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
