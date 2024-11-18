import { useFormik } from 'formik';
import { InquiryStyled } from './styled';
import { Button, Input, message, notification, Radio } from 'antd';
import { useState } from 'react';
import KakaoMap from '../KakaoMap';
import { addInquiryApi } from '@/pages/api/inquiryApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faClock,
  faEnvelope,
  faLocationDot,
  faPhone,
} from '@fortawesome/free-solid-svg-icons';

const { TextArea } = Input;

const Inquiry = () => {
  // 회원 타입
  const [type, setType] = useState('');

  const address = '서울 마포구 도화2길 53';

  const inquiryFormik = useFormik({
    initialValues: {
      title: '',
      email: '',
      contents: '',
    },
    onSubmit: async (values) => {
      if (type === '') {
        notification.warning({
          message: '회원 유형을 선택해 주세요!',
        });
        return;
      }

      // 문의 클릭시 엑시오스 넣기
      try {
        const inquiryData = {
          ...values,
          memberType: type,
        };
        await addInquiryApi(inquiryData);

        message.success('문의가 성공적으로 등록되었습니다.');
      } catch (error) {
        // console.error('등록실패', error);
      }
    },
  });

  return (
    <InquiryStyled>
      <div className="wrapBox">
        <div className="left">
          <p>HOST Inquiry</p>
          <p>호스트 등록 문의사항을 입력해주세요</p>
          <form onSubmit={inquiryFormik.handleSubmit}>
            <div className="inputBox">
              <div className="title">제목</div>
              <Input
                required
                name="title"
                onChange={inquiryFormik.handleChange}
                placeholder="제목을 입력해주세요"
              />
            </div>
            <div className="inputBox">
              <div className="title">이메일</div>
              <Input
                type="email"
                required
                name="email"
                onChange={inquiryFormik.handleChange}
                placeholder="이메일을 입력해주세요"
              />
            </div>
            <div className="inputBox">
              <div className="title">회원 유형</div>
              <Radio.Group
                onChange={(e: any) => {
                  setType(e.target.value);
                }}
              >
                <Radio value={'MEMBER'}>회원</Radio>
                <Radio value={'NONMEMBER'}>비회원</Radio>
              </Radio.Group>
            </div>

            <div className="inputBox">
              <div className="title">문의 내역</div>
              <TextArea
                className="content"
                required
                name="contents"
                onChange={inquiryFormik.handleChange}
              />
            </div>

            <Button htmlType="submit">문의하기</Button>
          </form>
        </div>

        <div className="right">
          <div className="conect">CONECT US</div>
          <div className="right-section">
            <div className="map">
              <p>
                <span>
                  <FontAwesomeIcon icon={faLocationDot} />
                </span>
                ADDRESS
              </p>
              <p>{address}</p>
              <KakaoMap address={address} />
            </div>
            <div className="company-info">
              <div>
                <p>
                  <span>
                    <FontAwesomeIcon icon={faEnvelope} />
                  </span>
                  EMAIL
                </p>

                <p>auctionchance13@gmail.com</p>
              </div>
              <div>
                <p>
                  <span>
                    <FontAwesomeIcon icon={faClock} />
                  </span>
                  Working Hours
                </p>

                <p>평일 09:00 - 18:00</p>
              </div>
              <div>
                <p>
                  <span>
                    <FontAwesomeIcon icon={faPhone} />
                  </span>
                  PHONE
                </p>
                <p>02-0000-0000</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </InquiryStyled>
  );
};
export default Inquiry;
