import React, { useState } from "react";
import Cronometro from "../components/Cronometro";
import Formulario from "../components/Formulario";
import Lista from "../components/Lista";
import Select from "../components/Select";
import { ITarefa } from "../types/tarefa";
import style from "./style.module.scss";

function App() {
  const [tarefas, setTarefas] = useState<ITarefa[]>([]);
  const [selecionado, setSelecionado] = useState<ITarefa>();
  const [opcao, setOpcao] = useState("Tasks");
  const [pomodoro, setPomodoro] = useState<ITarefa>({
    tarefa: "Foco",
    tempo: "00:25:00",
    selecionado: true,
    completado: false,
    id: "Pomodoro",
  });
  function selecionaTarefa(tarefaSelecionada: ITarefa) {
    setSelecionado(tarefaSelecionada);
    setTarefas((tarefasAnteriores) =>
      tarefasAnteriores.map((tarefa) => ({
        ...tarefa,
        selecionado: tarefaSelecionada.id === tarefa.id ? true : false,
      }))
    );
  }
  function finalizarTarefa(selected: ITarefa | undefined) {
    if (selecionado && selecionado.id !== "Pomodoro") {
      setSelecionado(undefined);
      setTarefas((tarefasAnteriores) =>
        tarefasAnteriores.map((tarefa) => {
          if (tarefa.id === selecionado.id) {
            return {
              ...tarefa,
              selecionado: false,
              completado: true,
            };
          }
          return tarefa;
        })
      );
    } else if (selected && selected.id === "Pomodoro") {
      console.log("Pausa termina");
      if (pomodoro.tarefa === "Foco") {
        return setPomodoro({
          ...selected,
          tarefa: "Pausa",
          tempo: "00:05:00",
          selecionado: true,
          completado: false,
        });
      }
      return setPomodoro({
        ...selected,
        tarefa: "Foco",
        tempo: "00:25:00",
        selecionado: true,
        completado: false,
        id: "Pomodoro",
      });
    }
  }
  function selecionaModo(novaOpcao: string) {
    setOpcao(novaOpcao);
  }

  return (
    <div className={style.AppStyle}>
      <Select
        botoes={["Tasks", "Pomodoro"]}
        selecionado={opcao}
        setOpcao={selecionaModo}
      />
      {opcao === "Tasks" ? (
        <>
          <Formulario setTarefas={setTarefas} />
          <Lista tarefas={tarefas} selecionaTarefa={selecionaTarefa} />
          <Cronometro
            selecionado={selecionado && selecionado}
            finalizarTarefa={finalizarTarefa}
          />
        </>
      ) : (
        <Cronometro selecionado={pomodoro} finalizarTarefa={finalizarTarefa} />
      )}
    </div>
  );
}

export default App;
