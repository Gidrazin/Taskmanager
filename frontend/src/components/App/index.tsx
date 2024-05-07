import "./App.scss";

function App() {
  return (
    <div className="App">
      <header className="header">
        <a className="logo" href="/">
          <img className="logo__img" src="/images/logo.png" alt="logo" />
        </a>
        <h2 className="fullName">
          <span>Казанцев Захар</span>
        </h2>
        <button className="create-btn">Создать работу</button>
      </header>
    </div>
  );
}

export default App;
