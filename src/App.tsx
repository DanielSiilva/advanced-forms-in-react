
import {Box} from './styles'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'

const createUserFormSchema = z.object({
  name: z.string()
          .nonempty('Nome é obrigatorio')
          .transform(name => {
            return name.trim().split(' ').map(word => {
              return word[0].toLocaleUpperCase().concat(word.substring(1))
            }).join(' ')
          }),
  email: z.string()
        .nonempty('O e-mail é obrigatorio')
        .email('Formato de e-mail invalido')
        .refine(email => email.endsWith('@nerds.com.br'),'O e-email precisa ser do clube dos nerdes'),
  password: z.string()
          .min(6, 'a senha precisa de no mino 6 caracteres')
})

type createUserFormData = z.infer< typeof createUserFormSchema>

export function App(){
  const [dataForm, setDataForm] = useState('')

  const {
    register,
    handleSubmit, 
    formState: {errors}} = useForm<createUserFormData>({
      resolver: zodResolver(createUserFormSchema)
    })

  //High-order  function
  function createUser(data: createUserFormData){
    setDataForm(JSON.stringify(data, null, 2))
    
  }


  

  return (
    <Box>
      <form
        onSubmit={handleSubmit(createUser)}
      >
        <label htmlFor="">Nome completo</label>
        <input 
          type="text" 
          {...register('name')}
        /> 
        {errors.name && <span>{errors.name.message}</span>}

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

      {dataForm}
    </Box>
  )
}


