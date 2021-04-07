import { FC } from "react";

export const App: FC = () => (
  <div
    style={{
      fontFamily: "sans-serif",
      lineHeight: "1.5em",
      maxWidth: 600,
      padding: 20,
      margin: "0 auto",
    }}
  >
    <h1>Hello, Hulan!</h1>
    <p>
      Welkom in de Hulan Intake Front-End template. Een foutloze npm start is
      het halve werk, en zo te zien ben jij al goed op weg.
    </p>
    <p>
      Voel je vrij om met dit project te doen wat jij denkt dat nodig is om aan
      de opdracht te voldoen! Je bent absoluut niet beperkt tot de 'src'
      directory.
      <span role="img" aria-label="Knipoog emoji">
        😉
      </span>
    </p>
    <p>Niets moet, alles mag. Veel succes gewenst!</p>
  </div>
);
