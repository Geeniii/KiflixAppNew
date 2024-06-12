import { A, useNavigate } from "@solidjs/router";
import { UserAuth } from "../../Context/AuthContext";

export const NavBar = () => {
    const { user, logOut } = UserAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logOut();
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <nav class="absolute w-full z-50 top-0 bg-transparent">
            <div class="w-full px-4 md:px-8 py-2 flex items-center justify-between">
                <A href="/">
                    <h1 class="text-red-600 text-3xl font-bold cursor-pointer">KIFLIX</h1>
                </A>
                {user() && user().email ? (
                    <ul class="flex justify-between gap-2">
                        <li><A href="/Account"><button class="py-1 px-2.5 rounded text-white">Account</button></A></li>
                        <li><button onClick={handleLogout} class="bg-red-600 py-1 px-2.5 rounded text-white">Log Out</button></li>
                    </ul>
                ) : (
                    <ul class="flex justify-between gap-2">
                        <li><A href="/LogIn"><button class="py-1 px-2.5 rounded text-white">Login</button></A></li>
                        <li><A href="/SignIn"><button class="bg-red-600 py-1 px-2.5 rounded text-white">Sign Up</button></A></li>
                    </ul>
                )}
            </div>
        </nav>
    );
};