import { useEffect, useState } from "react";
import useSound from "use-sound";
import alarmSound from "../../assets/sounds/alarmSound.mp3";
import { tempoParaSegundos } from "../../common/utils/date";
import { ITarefa } from "../../types/tarefa";
import Botao from "../Botao";
import style from "./Cronometro.module.scss";
import Relogio from "./Relogio";

interface Props {
  selecionado: ITarefa | undefined;
  finalizarTarefa: () => void;
}
export default function Cronometro({ selecionado, finalizarTarefa }: Props) {
  const [tempo, setTempo] = useState<number>();
  const [playOn] = useSound(alarmSound, {
    sprite: {
      alarm: [7000, 5000],
    },
    volume: 0.5,
  });

  useEffect(() => {
    if (selecionado?.tempo) {
      setTempo(tempoParaSegundos(selecionado.tempo));
    }
  }, [selecionado]);
  function regressiva(contador: number = 0) {
    setTimeout(() => {
      if (contador > 0) {
        setTempo(contador - 1);
        return regressiva(contador - 1);
      }
      playOn({ id: "alarm" });
      finalizarTarefa();
    }, 1000);
  }
  return (
    <div className={style.cronometro}>
      <p className={style.titulo}>Escolha um card e inicie o cronômetro</p>
      <div className={style.relogioWrapper}>
        <Relogio tempo={tempo === undefined ? 0 : tempo} />
      </div>
      <Botao onClick={() => regressiva(tempo)}>Começar</Botao>
    </div>
  );
}
