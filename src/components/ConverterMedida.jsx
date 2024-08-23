import {useEffect, useState} from "react";

export default function ConverterMedida() {
    const [medidas, setMedidas] = useState({});
    const [valor, setValor] = useState('');
    const [unidadeDeConversao, setUnidadeDeConversao] = useState('quilometros');
    const [resultado, setResultado] = useState(null);

    useEffect(() => {
        fetch('./comprimentos.json')
            .then(resposta => resposta.json())
            .then(dados => setMedidas(dados.metros))
            .catch(erro => console.error("Erro ao tentar carregar as convercoes de medidas: ", erro))
    }, []);

    const fazerConversao = () => {
        const medidaConversao = medidas[unidadeDeConversao];
        if (medidaConversao) {
            setResultado(valor * medidaConversao);
        }
    };
    return (
        <>
            <h1>Conversão</h1>
            <input
                type="number"
                value={valor}
                onChange={e => setValor(e.target.value)}
                placeholder="Valor em metros"
            />
            <span>Para</span>
            <select value={unidadeDeConversao} onChange={e => setUnidadeDeConversao(e.target.value)}>
                {Object.keys(medidas).map(unidade => (
                    <option key={unidade} value={unidade}>{unidade}</option>
                ))}
            </select>
            <button onClick={fazerConversao}>Converter</button>
            {resultado !== null && <p>Resultado: {resultado.toFixed(2)} {unidadeDeConversao}</p>}

        </>
    )
}