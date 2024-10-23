import styled from 'styled-components';

export const DateTimePickerStyled = styled.div`
    .custom-datepicker {
        background-color: inherit;
        border: 0;
    }
    .react-datepicker {
        background-color: #ffff; /* 달력 배경색 */
        border-radius: 10px; /* 테두리 둥글게 */
        border: 2px solid #f0f0f0; /* 테두리 색상 */
        padding: 10px;
        font-family: Arial, sans-serif; /* 폰트 */
    }
    .react-datepicker__triangle {
        display: none;
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
    .time-select {
        display: flex;
        align-items: center;
        margin-top: 20px;
        width: 100%;
        overflow-x: auto; /* 가로 스크롤을 가능하게 설정 */
        white-space: nowrap; /* 시간 슬롯들이 한 줄로 나타나게 설정 */
        scroll-behavior: smooth; /* 스크롤이 부드럽게 이동하게 설정 */
        &::-webkit-scrollbar {
            display: none;
        }
        .time-slot {
            padding: 10px;
            display: flex;
            justify-content: center;
            align-items: center;

            cursor: pointer;
            transition: background-color 0.3s ease;
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
