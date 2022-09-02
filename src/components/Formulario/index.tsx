import React from "react";
import { ITarefa } from "../../types/tarefa";
import Botao from "../Botao";
import style from "./style.module.scss";
import { v4 as uuidv4 } from "uuid";
class Formulario extends React.Component<{
  setTarefas: React.Dispatch<React.SetStateAction<ITarefa[]>>;
}> {
  state = {
    tarefa: "",
    tempo: "00:00",
  };
  adicionaTarefa(event: React.FormEvent) {
    event.preventDefault();
    this.props.setTarefas((preventState) => [
      ...preventState,
      {
        ...this.state,
        selecionado: false,
        completado: false,
        id: uuidv4(),
      },
    ]);
    this.setState({ tarefa: "", tempo: "00:00:00" });
  }
  render() {
    return (
      <form
        className={style.novaTarefa}
        action=""
        onSubmit={(event) => this.adicionaTarefa(event)}
      >
        <div className={style.inputContainer}>
          <label htmlFor="tarefa">Adicione um novo estudo</label>
          <input
            type="text"
            name="tarefa"
            id="tarefa"
            value={this.state.tarefa}
            onChange={(event) =>
              this.setState({ ...this.state, tarefa: event.target.value })
            }
            placeholder="O que você quer estudar"
            required
          />
        </div>
        <div className={style.inputContainer}>
          <label htmlFor="">Tempo</label>
          <input
            type="time"
            step="1"
            name="tempo"
            value={this.state.tempo}
            id="tempo"
            onChange={(event) =>
              this.setState({ ...this.state, tempo: event.target.value })
            }
            min={"00:00:00"}
            max="01:30:00"
            required
          />
        </div>
        <Botao type="submit">Adicionar</Botao>
      </form>
    );
  }
}
export default Formulario;
