/* eslint-disable no-unused-vars */
import styled from "styled-components";


export const HomeContainer = styled.div`
background-image:url(../newBg.jpg);
background-size:cover;
background-repeat:no-repeat;
object-fit:contain;
position:relative;
`;


export const ScrollBar = styled.div`

 scrollbar-color: #d4aa70 #e4e4e4;
&::-webkit-scrollbar {
  width: 5px;

}

&::-webkit-scrollbar-track {
  border-radius: 100px;
}

&::-webkit-scrollbar-thumb {
  background-color: #d4aa70;
  border-radius: 100px;
   background-color: #FFB84C;
}



`;