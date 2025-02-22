import CaptchaForm from './components/CaptchaForm'

function App() {
  return (
    <div className="h-screen overflow-hidden bg-gray-100 p-8 flex items-center">
      <div className="h-[90%] w-full max-w-7xl mx-auto">
        <CaptchaForm />
      </div>
    </div>
  )
}

export default App
