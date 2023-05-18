
import {Box} from './styles'

import {useForm} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const createUserFormSchema = z.object({
  email: z.string()
        .nonempty('O e-mail é obrigatorio')
        .email('Formato de e-mail invalido'),
  password: z.string()
          .min(6, 'a senha precisa de no mino 6 caracteres')
})

type creatUserFormData = z.infer< typeof createUserFormSchema>

export function App(){
  const {
    register,
    handleSubmit, 
    formState: {errors}} = useForm<creatUserFormData>({
      resolver: zodResolver(createUserFormSchema)
    })

  //High-order  function
  function createUser(data: any){
    console.log(`User criado`);
    
  }

  return (
    <Box>
      <form
        onSubmit={handleSubmit(createUser)}
      >
        <label htmlFor="">E-mail</label>
        <input 
          type="email" 
          {...register('email')}
        /> 
        {errors.email && <span>{errors.email.message}</span>}

        <label htmlFor="">Senha </label>
        <input 
          type="password" 
          {...register("password")}
        /> 

        {errors.password && <span>{errors.password.message}</span>}

        <button> Enviar </button>
      </form>
    </Box>
  )
}


