import { useFormik } from 'formik';
import { InquiryStyled } from './styled';
import { Button, Input, message, notification, Radio } from 'antd';
import { useEffect, useState } from 'react';
import KakaoMap from '../KakaoMap';
import { addInquiryApi } from '@/pages/api/inquiryApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faClock,
  faEnvelope,
  faLocationDot,
  faPhone,
} from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

const { TextArea } = Input;

const Inquiry = () => {
  const userInfo = useSelector((state: RootState) => state.user.userInfo);

  // 회원 타입
  const [type, setType] = useState('');

  const address = '서울 마포구 도화2길 53';

  const inquiryFormik = useFormik({
    initialValues: {
      title: '',
      email: '',
      contents: '',
      phoneNumber: '',
      name: '',
    },
    validate: (values) => {
      const errors: { phoneNumber?: string } = {};
      if (values.phoneNumber.replace(/\D/g, '').length !== 11) {
        errors.phoneNumber = '전화번호는 11자리 숫자여야 합니다.';
      }

      return errors;
    },
    onSubmit: async (values, { resetForm }) => {
      if (type === '') {
        notification.warning({
          message: '회원 유형을 선택해 주세요!',
        });
        return;
      }
      try {
        const inquiryData = {
          ...values,
          memberType: type,
        };
        await addInquiryApi(inquiryData);
        message.success('문의가 성공적으로 등록되었습니다.');
        resetForm();
        setType('');
      } catch (error) {
        console.error('등록실패', error);
      }
    },
  });

  //핸드폰 번호 형태 바꾸기
  const formatPhoneNumber = (phoneNumber: string) => {
    const cleaned = phoneNumber.replace(/\D/g, '');

    if (cleaned.length === 11) {
      return cleaned.replace(/^(\d{3})(\d{4})(\d{4})$/, '$1-$2-$3');
    }

    return phoneNumber;
  };

  useEffect(() => {
    if (userInfo?.email && userInfo.email !== '') {
      inquiryFormik.setFieldValue('email', userInfo.email); 
      setType('MEMBER'); 
    } else {
      setType('NONMEMBER'); 
    }
  }, [userInfo]);

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
                value={inquiryFormik.values.title}
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
                value={inquiryFormik.values.email}
              />
            </div>
            <div className="inputBox">
              <div className="title">이름</div>
              <Input
                type="text"
                required
                name="name"
                onChange={inquiryFormik.handleChange}
                placeholder="이름을 입력해주세요"
                value={inquiryFormik.values.name}
              />
            </div>
            <div className="inputBox">
              <div className="title">연락처</div>
              <Input
                type="text"
                required
                name="phoneNumber"
                onChange={(e) => {
                  const formattedValue = formatPhoneNumber(e.target.value);
                  inquiryFormik.setFieldValue('phoneNumber', formattedValue);
                }}
                placeholder="연락처를 입력해주세요(하이픈 제외 숫자만 입력해주세요)"
                value={inquiryFormik.values.phoneNumber}
                onBlur={() => {
                  const phoneError = inquiryFormik.errors.phoneNumber;
                  if (phoneError) {
                    message.error(phoneError);
                  }
                }}
              />
            </div>
            <div className="inputBox">
              <div className="title">회원 유형</div>
              <Radio.Group
                onChange={(e: any) => {
                  setType(e.target.value);
                }}
                value={type}
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
                value={inquiryFormik.values.contents}
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
