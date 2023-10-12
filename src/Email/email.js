import axios from "axios"

function Gmail() {
    const sendGmail = async () => {
        await axios.post('http://localhost:3001/send', {
            gmail: "yulianaroman376@gmail.com",
            name: "Yuli",
        });
    };

    return (
        <>
            <button onClick={()=> sendGmail()}> Enviar Gmail</button>
        </>
    );
}
export default Gmail;