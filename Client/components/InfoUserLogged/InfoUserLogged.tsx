import { DefaultSession } from "next-auth";

// Default Session TYPE

export function InfoUserLogged({ user }: { user: DefaultSession["user"] }) {
    return (
        <div>
            <div>
                <p>Usuario actualmente registrado</p>
                <h5>{user?.name}</h5>
                <p>{user?.email}</p>
            </div>
        </div>
    )
}