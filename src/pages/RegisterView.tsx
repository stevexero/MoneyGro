import { useParams } from 'react-router-dom';

const RegisterView = () => {
  const { id } = useParams();
  return <div>RegisterView {id}</div>;
};

export default RegisterView;
