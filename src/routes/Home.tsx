import { UserProps } from "../types/user";

import Search from "../components/Search"
import User from "../components/user"
import Error from "../components/Erro"

import {useState}  from "react";

export default function Home() {

    const [user, setUser] = useState<UserProps | null>(null);
    const [erro, setErro] = useState(false);

    const loadUser = async(userName: string) =>{
      setErro(false);
      setUser(null);

        const res = await fetch(`https://api.github.com/users/${userName}`)

        const data = await res.json();

        if(res.status === 404){
          setErro(true);
          return;
        }

        const {avatar_url, login, location, followers, following} = data

        const userData: UserProps = {
            avatar_url, 
            login, 
            location, 
            followers, 
            following,
        };

        setUser(userData);
    };

  return (
    <div>
        <Search loadUser={loadUser}/>
        {user && <User {...user}/>}
        {erro && <Error />}
    </div>
  );
};

