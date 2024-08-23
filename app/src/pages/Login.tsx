import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useForm, SubmitHandler } from "react-hook-form"
import { useAuth } from "@/contexts/useAuth";

type Inputs = {
  email: string;
  password: string;
}

export default function Login() {
  const { loginUser } = useAuth();
  const {
    register,
    handleSubmit,
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    loginUser(data);
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="w-full max-w-md p-6 space-y-4">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Iniciar Sesión</CardTitle>
            <CardDescription>Ingresa tu correo y contraseña para acceder a tu cuenta.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Correo</Label>
              <Input id="email" type="email" placeholder="Ingrese su correo" required {...register("email")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input id="password" type="password" required {...register("password")} />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              Iniciar Sesión
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}