import React, { useState }  from 'react';
import { SignIn } from './SignIn';
import { SignUp } from './SignUp';
import { Feed1 } from "./Feed1";
import "../css/Home.css";

export function Home() {
    const [loggedin, setLogin] = useState(true);
    const [signedup, setSignedUp] = useState(true);

    return (
        <>
            { loggedin ? <Feed1 /> : 
                <div class="b-split-screen">
                    <div class="left-pane"></div>
                    <div class="right-pane">{ signedup ? <SignIn/> : <SignUp/> }</div>
                </div>
            }
        </>
    );
    
}
