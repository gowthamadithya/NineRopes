import { useState, useEffect } from "react"
import axios from "axios"

function CreateAKlip() {
    const [title, setTitle] = useState('')
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')
    const [selectData, setSelectData] = useState([])
    const [selectValue, setSelectValue] = useState('')



    // this code shows how to use the React fetch http for GET and POST
    // const fetchData = async(processing) => {
    //     const options = {
    //         method: 'POST',
    //         headers: {'Content-type': 'application/json'},
    //         body: JSON.stringify({
    //             Title: Title,
    //             message: message
    //         })
    //     }
    //
    //     await fetch('https://jsonplaceholder.typicode.com/users')
    //     .then(res => res.json())
    //     .then(data => {
    //         if (processing) {
    //             setSelectData(data)
    //         }
    //     })
    //     .catch(err => console.log(err))
    // }



    const axiosPostData = async() => {
        const postData = {
            title: title,
            message: message
        }

        await axios.post('http://127.0.0.1:4000/rest/create', postData)
        .then(res => setError(<p className="success">{res.data}</p>))
    }

    // const SelectDropdown = () => {
    //     return (
    //         <select value={selectValue} onChange={(e) => setSelectValue(e.target.value)}>
    //             <option value="" key="none"> -- Select One -- </option>
    //             {
    //                 selectData?.map( (item) => (
    //                     <option value={item.website} key={item.website}>{item.website}</option>
    //                 ))
    //             }
    //         </select>
    //     )
    // }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!message) {
            setError(<p className="required">Message is empty. Please type a message.</p>)
        } else {
            setError('')
            axiosPostData()
        }
    }

    return (
        <>
            <h1>CreateAKlip </h1>

            <form className="CreateAKlipForm">
                <label>Title</label>
                <input type="text" id="Title" name="Title" value={title} onChange={(e) => setTitle(e.target.value)} />

                <label>Message</label>
                <textarea id="message" name="message" value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
                
                {error}

                <button type="submit" onClick={handleSubmit}>Klip</button>
            </form>
        </>
    )
}

export default CreateAKlip