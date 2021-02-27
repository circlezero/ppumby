import React, { useEffect } from "react";
import styled from "styled-components";

const LoginWrapper = styled.div``;

export default function LoginPage() {
  useEffect(() => {}, []);
  return (
    <LoginWrapper>
      <input type="text" placeholder="이메일을 입력해주세요" />
      <button>인증코드 보내기</button>
      <div>뿜이 처음이신가요?</div>
    </LoginWrapper>
  );
}
