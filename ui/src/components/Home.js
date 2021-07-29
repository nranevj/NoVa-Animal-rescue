import React, { useState }  from 'react';
import { SignIn } from './SignIn';
import { SignUp } from './SignUp';
import { Feed } from "./Feed";
import { Feed1 } from "./Feed1";
import "../css/Home.css";

export function Home() {
    const [loggedin, setLogin] = useState(false);

    return (
        <>
            <Feed1 />

            {/* TODO: routing */}

            {/* { loggedin ? <Feed /> : 
                <div class="b-split-screen">
                    <div class="left-pane"></div>
                    <div class="right-pane">{ loggedin ? <SignIn /> : <SignUp /> }</div>
                </div>
            } */}
            
        </>
    );
    
}
