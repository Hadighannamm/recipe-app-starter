import { useState } from "react";

type AuthFormProps = {
    onSignUp: (email:string, password:string) => Promise<boolean>;
    onSignIn: (email:string, password:string) => Promise<boolean>;
    error:string;
    successMessage: string;
    loading:boolean;
}

export default function AuthForm({
    onSignUp, onSignIn, error, successMessage, loading
}: AuthFormProps){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [localError, setLocalError] = useState("")

    function validate(){
        if(!email.trim() || !password.trim()){
            setLocalError("Email & pass are required!")
            return false
        }
        setLocalError("")
        return true;
    }

    async function handleSignUp(){
        if(!validate()) return;
        await onSignUp(email,password);
    }
    
    async function handleSignIn(){
        if(!validate()) return;
        await onSignIn(email,password);
    }

    return(
        <div className="form-card" style={{ maxWidth: "500px", margin: "0 auto" }}>
            <h2 style={{ marginBottom: "1.5rem" }}>Authentication</h2>
            
            <div className="form-group">
                <label>Email Address</label>
                <input 
                    type="email" 
                    value={email} 
                    onChange={(e)=>setEmail(e.target.value)} 
                    placeholder="Enter your email" 
                />
            </div>

            <div className="form-group">
                <label>Password</label>
                <input 
                    type="password" 
                    value={password} 
                    onChange={(e)=>setPassword(e.target.value)} 
                    placeholder="Enter your password" 
                />
            </div>

            {localError && <p className="error-msg">{localError}</p>}
            {error && <p className="error-msg">{error}</p>}
            {successMessage && <p className="success-msg">{successMessage}</p>}

            <div style={{ display: "flex", gap: "10px", marginTop: "2rem" }}>
                <button onClick={handleSignIn} disabled={loading} style={{ flex: 1 }}>Sign In</button>
                <button onClick={handleSignUp} disabled={loading} className="btn-outline" style={{ flex: 1 }}>Sign Up</button>
            </div>
        </div>
    )
}