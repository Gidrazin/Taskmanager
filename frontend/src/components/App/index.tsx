import "./App.scss";
import CreateBtn from "../Create-btn";
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
        <CreateBtn />
      </header>
      <main className="main">
        <table className="table">
          <thead className="table__head">
            <tr className="table__head-row">
              <th className="table__head-ceil">Тема</th>
              <th className="table__head-ceil">Наименование</th>
              <th className="table__head-ceil">ФИО</th>
              <th className="table__head-ceil">Финиш</th>
              <th className="table__head-ceil">Номер ЛЗ</th>
              <th className="table__head-ceil">Стр</th>
            </tr>
          </thead>
          <tbody className="table__body">
            <tr className="table__body-row table__body-row--announced">
              <td className="table__body-ceil">793</td>
              <td className="table__body-ceil">Выпуск ИО МУ АНТЕНН</td>
              <td className="table__body-ceil"></td>
              <td className="table__body-ceil"></td>
              <td className="table__body-ceil"></td>
              <td className="table__body-ceil"></td>
            </tr>
            <tr className="table__body-row table__body-row--inProgress">
              <td className="table__body-ceil">793</td>
              <td className="table__body-ceil">Выпуск ИО МУ АНТЕНН</td>
              <td className="table__body-ceil">Мальцев Роман Алексеевич</td>
              <td className="table__body-ceil"></td>
              <td className="table__body-ceil"></td>
              <td className="table__body-ceil"></td>
            </tr>
            <tr className="table__body-row table__body-row--done">
              <td className="table__body-ceil">793</td>
              <td className="table__body-ceil">Выпуск ИО МУ АНТЕНН</td>
              <td className="table__body-ceil">Мальцев Роман Алексеевич</td>
              <td className="table__body-ceil">31.12.2024</td>
              <td className="table__body-ceil">ЛЗ-152124</td>
              <td className="table__body-ceil">27</td>
            </tr>
          </tbody>
        </table>
      </main>
    </div>
  );
}

export default App;
