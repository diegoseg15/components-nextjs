export default function LoginPage(){

    const handleChange = (e) => {
        console.log(e.target.value, e.target.name);
    }

    return(
        <div>
            <form>
                <input name="email" type="email" placeholder="email" onChange={e=>handleChange(e)}/>
                <input name="password" type="password" placeholder="password" onChange={e=>handleChange(e)}/>
                <button>login</button>
            </form>
        </div>
    )
}