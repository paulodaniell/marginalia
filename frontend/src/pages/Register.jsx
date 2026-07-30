import { useActionState, useEffect } from "react";
import { z } from "zod";
import api from "../service/api";
import Button from "../components/Button";
import LogoImg from "../assets/marginalia-wordmark.svg";
import { useAuth } from "../hooks/authHook";
import { useNavigate } from "react-router-dom";


const userSchema = z.object({
  name: z.string().min(2, { message: "Informe um nome válido" }),
  email: z.string().email({ message: "E-mail inválido" }),
  password: z.string().min(6, { message: "Informe a senha com pelo menos 6 caracteres" }),
  avatar_url: z
    .string()
    .url({ message: "URL do avatar inválida" })
    .optional()
    .or(z.literal("")),
});

export default function Register() {
  const { login } = useAuth();
  const navigate = useNavigate();

  async function registerAction(previousState, formData) {
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      avatar_url: formData.get("avatar_url"),
    };

    const validacao = userSchema.safeParse(data);

    if (!validacao.success) {
      return {
        errors: validacao.error.flatten().fieldErrors,
        success: false,
      };
    }

    try {
      const response = await api.post("/users/register", {
        name: data.name,
        email: data.email,
        password: data.password,
        avatar_url: data.avatar_url || undefined,
      });

      login(response.data.user, response.data.token);

      return { success: true, errors: {} };
    } catch (error) {
      return {
        errors: { form: error.response?.data?.message || "Erro ao tentar criar conta" },
        success: false,
      };
    }
  }

  const [state, formAction, isPending] = useActionState(registerAction, {
    errors: {},
    success: false,
  });
  useEffect(()=>{
    if(state.success){
      navigate("/home");
    }
  },[state.success, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-papel">
      <div className="w-full max-w-sm">
        
        <div className="text-center mb-8">
          <img 
            src={LogoImg} 
            alt="Marginalia" 
            className="h-16 mx-auto mb-2 object-contain" 
          />
          <p className="text-xs text-tinta/70 font-sans tracking-wide">
            leia, anote, pergunte
          </p>
        </div>

        <div className="bg-white/60 backdrop-blur-sm border border-tinta/10 rounded-2xl p-7 shadow-sm">
          <h2 className="font-serif text-2xl text-tinta font-medium mb-6 text-center">
            Criar conta
          </h2>

          <form action={formAction} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-tinta/80 mb-1">
                Nome
              </label>
              <input
                className="w-full px-3.5 py-2 text-sm text-tinta bg-white border border-tinta/20 rounded-lg outline-none transition-all focus:border-indigo focus:ring-1 focus:ring-indigo"
                type="text"
                name="name"
                placeholder="Seu nome completo"
              />
              {state?.errors?.name && (
                <span className="block text-nota font-hand text-sm mt-1">
                  {state.errors.name[0]}
                </span>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-tinta/80 mb-1">
                E-mail
              </label>
              <input
                className="w-full px-3.5 py-2 text-sm text-tinta bg-white border border-tinta/20 rounded-lg outline-none transition-all focus:border-indigo focus:ring-1 focus:ring-indigo"
                type="email"
                name="email"
                placeholder="seu@email.com"
              />
              {state?.errors?.email && (
                <span className="block text-nota font-hand text-sm mt-1">
                  {state.errors.email[0]}
                </span>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-tinta/80 mb-1">
                Senha
              </label>
              <input
                className="w-full px-3.5 py-2 text-sm text-tinta bg-white border border-tinta/20 rounded-lg outline-none transition-all focus:border-indigo focus:ring-1 focus:ring-indigo"
                type="password"
                name="password"
                placeholder="••••••••"
              />
              {state?.errors?.password && (
                <span className="block text-nota font-hand text-sm mt-1">
                  {state.errors.password[0]}
                </span>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-tinta/80 mb-1">
                URL do Avatar <span className="text-tinta/40 font-normal">(opcional)</span>
              </label>
              <input
                className="w-full px-3.5 py-2 text-sm text-tinta bg-white border border-tinta/20 rounded-lg outline-none transition-all focus:border-indigo focus:ring-1 focus:ring-indigo"
                type="url"
                name="avatar_url"
                placeholder="https://exemplo.com/avatar.jpg"
              />
              {state?.errors?.avatar_url && (
                <span className="block text-nota font-hand text-sm mt-1">
                  {state.errors.avatar_url[0]}
                </span>
              )}
            </div>

            {state?.errors?.form && (
              <div className="bg-nota/10 border border-nota/30 text-nota text-xs p-3 rounded-lg font-medium text-center">
                {state.errors.form}
              </div>
            )}

            <div className="pt-2">
              <Button type="submit" isPending={isPending}>
                Cadastrar
              </Button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}