import styled, { keyframes } from "styled-components";
import { ReactComponent as LoadingIcon } from "assets/loading.svg";

const Rotate = keyframes`
  from {
    transform: rotate(0);
  }
  
  to {
    transform: rotate(-360deg);
  }
`;

const Loading = styled(LoadingIcon)`
  fill: ${({ theme }) => theme.text};
  animation: ${Rotate} 1s linear infinite;
  height: 89px;
  width: 89px;
`;

export default Loading;
