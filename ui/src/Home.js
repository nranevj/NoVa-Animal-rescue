import React, { useState }  from 'react';
import { SignIn } from './SignIn';
import { SignUp } from './SignUp';
import "./Home.css";

export function Home() {
    const [loggedin, setLogin] = useState(false);

    return (
        <>
            <div class="b-split-screen">
                <div class="left-pane"></div>
                <div class="right-pane">{ loggedin ? <SignIn /> : <SignUp /> }</div>
            </div>
        </>
    );
    
}
