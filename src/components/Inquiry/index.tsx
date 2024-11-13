import { useFormik } from 'formik';
import { InquiryStyled } from './styled';
import { Button, Input, notification, Radio } from 'antd';
import { useState } from 'react';
import KakaoMap from '../KakaoMap';

const { TextArea } = Input;

const Inquiry = () => {
  // 회원 타입
  const [type, setType] = useState('');

  const inquiryFormik = useFormik({
    initialValues: {
      title: '',
      email: '',
      content: '',
    },
    onSubmit: (values) => {
      if (type === '') {
        notification.warning({
          message: '회원 유형을 선택해 주세요!',
        });
        return;
      }

      // 문의 클릭시 엑시오스 넣기
    },
  });

  return (
    <InquiryStyled>
      <div className="conect">CONECT US</div>
      <div className="wrapBox">
        <div className="left">
          <form onSubmit={inquiryFormik.handleSubmit}>
            <div className="inputBox">
              <div className="title">이메일</div>
              <Input
                type="email"
                required
                name="email"
                onChange={inquiryFormik.handleChange}
              />
            </div>
            <div className="inputBox">
              <div className="title">회원 유형</div>
              <Radio.Group
                onChange={(e: any) => {
                  setType(e.target.value);
                }}
              >
                <Radio value={'member'}>회원</Radio>
                <Radio value={'none'}>비회원</Radio>
              </Radio.Group>
            </div>
            <div className="inputBox">
              <div className="title">제목</div>
              <Input
                required
                name="title"
                onChange={inquiryFormik.handleChange}
              />
            </div>
            <div className="inputBox">
              <div className="title">문의 내역</div>
              <TextArea
                className="content"
                required
                name="content"
                onChange={inquiryFormik.handleChange}
              />
            </div>

            <Button htmlType="submit">문의하기</Button>
          </form>
        </div>

        <div className="right">
          <KakaoMap address="서울 마포구 도화2길 53" />
        </div>
      </div>
    </InquiryStyled>
  );
};
export default Inquiry;
