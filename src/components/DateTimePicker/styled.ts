import styled from 'styled-components';

export const DateTimePickerStyled = styled.div`
  width: 100%;
  .react-datepicker-popper {
    z-index: 9999999;
  }
  .custom-datepicker {
    background-color: inherit;
    border: 1px solid gray;
    border-radius: 8px;
    width: 320px;
    height: 35px;
    padding: 10px;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .react-datepicker {
    background-color: #ffff; /* 달력 배경색 */
    border-radius: 10px; /* 테두리 둥글게 */
    border: 2px solid #f0f0f0; /* 테두리 색상 */
    padding: 10px;
    font-family: Arial, sans-serif; /* 폰트 */
    z-index: 1000;
  }
  .react-datepicker__triangle {
    display: none;
  }
  .react-datepicker__portal {
    z-index: 1050;
  }
  .react-datepicker__header {
    background-color: #ffff; /* 헤더 배경 */
    color: white; /* 헤더 글씨 색상 */
    border-bottom: none;
    padding: 10px;
    border-bottom: 1px solid gray;
  }
  .react-datepicker__day--selected {
    background-color: #000; /* 선택된 날짜 배경 */
    color: white;
  }
  .react-datepicker__navigation {
    top: 12px;
  }
  .react-datepicker__month {
    margin: 20px 0;
  }
  .custom-datepicker-input {
    width: 200px;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ddd;
    font-size: 16px;
  }
  .time-select-title {
    text-align: left;
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }
  .selected-time-info {
    font-size: 14px;
    color: #6b5b95;
  }
  .swiper-container {
    width: 100%;
    position: relative;
    margin-top: 20px;
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f8f9fa;
    overflow: visible;
    margin-bottom: 20px;
    .time-slot {
      width: 100%;
      padding: 15px 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }
    .time-slot.booked {
      background-color: orangered; /* 예약된 시간 슬롯 색상 */
      cursor: not-allowed;
      pointer-events: none;
    }
    .price {
      font-size: 10px;
    }
    .time-boundary {
      text-align: left;
      font-size: 12px;
      color: #333;
      position: relative;
      border-bottom: 0.5px solid white;
      padding: 5px 0;
      z-index: -10;
    }
    .selected {
      background-color: #6a5acd;
      color: white;
    }
    .unselected {
      color: black;
    }
  }
`;
