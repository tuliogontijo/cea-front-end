import { Input as InputAntd} from 'antd';
import ButtonFooter from '../ButtonFooter';

const InputReply = () => {

  return (
//  <Input.Group compact>
 <>

    <InputAntd
    rows={6}
    maxLength={255}
    placeholder="Digite sua resposta aqui!"
    />
    <ButtonFooter/>
</>
  )
}

export default InputReply;