import { Input } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';

const style = require('./style.scss');

if (style.use) {
  style.use();
}

export default class NumberInput extends React.Component {
  static propTypes = {
    /** 是否支持浮点小数 */
    isFloatNumber: PropTypes.bool,
    /** 是否只能输入正数 */
    isIntNumber: PropTypes.bool,
    /** 是否支持输入负数 */
    isNegativeNumber: PropTypes.bool,
    /** 是否支持只能输入正数 */
    isPositiveNumber: PropTypes.bool,
    /** 是否允许输入以零开头的数字 */
    isAllowZeroBegin: PropTypes.bool,
    /** 整数部分的最大长度 */
    maxLen: PropTypes.number,
    /** 小数部分的最大长度 */
    decimalMaxLen: PropTypes.number,
    /** onChange事件 */
    onChange: PropTypes.func,
  };

  static defaultProps = {
    isFloatNumber: false,
    isIntNumber: true,
    isNegativeNumber: false,
    isAllowZeroBegin: false,
    isPositiveNumber: false,
    decimalMaxLen: 2,
    maxLen: 10,
    onChange: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
    this.changeInput = this.changeInput.bind(this);
  }

  componentDidMount() {}

  componentDidUpdate() {}

  componentWillUnmount() {}

  //  更改input
  changeInput(e) {
    const {
      isNegativeNumber,
      isPositiveNumber,
      isFloatNumber,
      isIntNumber,
      isAllowZeroBegin,
      maxLen,
      decimalMaxLen,
      onChange,
    } = this.props;
    // 只能输入小数正则
    const decimalTest = isNegativeNumber ? /[^\d.-]|(^\.+)/g : /[^\d.]|(^\.+)/g;
    // 只能输入整数正则
    const numberTest = isNegativeNumber ? /[^\d-]/g : /[^\d]/g;
    // 去掉多余的小数点只能一个。
    const moreNegativeTest = /-{2,}/g;
    // 去掉多余的-只能一个-
    const moreDotTest = /\.{2,}/g;
    let { value } = e.target;
    //  第一个字符是否可以是零
    if (!isAllowZeroBegin) {
      if (isNegativeNumber) {
        if (value.indexOf('0') === 1) {
          value = '-';
        }
        if (value.indexOf('0') === 0) {
          value = '';
        }
      } else if (value.indexOf('0') === 0 && value.length > 1) {
        value = value.slice(1);
      }
    }
    //  只能输入正数
    if (isPositiveNumber) {
      if (value.indexOf('0') === 0 && value.length === 1) {
        value = '';
      }
    }

    //  是否是负数
    if (isNegativeNumber) {
      value = value.replace(moreNegativeTest, '-');
      const negativeArr = value.split('-');
      if (negativeArr.length > 2) {
        let negValue = '';
        negativeArr.forEach((item) => {
          negValue = `${negValue}${item}`;
        });
        value = `-${negValue}`;
      }
    }
    //  是否是小数
    if (isFloatNumber) {
      value = value.replace(decimalTest, '');
      value = value.replace(moreDotTest, '.');
      let tempArr = [];
      let newValue = '';
      tempArr = value.split('.');
      if (tempArr.length > 2) {
        tempArr.forEach((item, index) => {
          if (index < tempArr.length - 1) {
            newValue = `${newValue}${item}`;
          } else if (newValue.length > maxLen) {
            newValue = `${newValue.slice(0, maxLen)}.${tempArr[index - 1]}`;
          } else {
            newValue = `${newValue}.${item}`;
          }
        });
        value = newValue;
      } else {
        let numberValue = `${tempArr[0]}`;
        if (numberValue.length > maxLen) {
          numberValue = numberValue.slice(0, maxLen);
          value = numberValue;
        }
        if (tempArr[1]) {
          let decimal = tempArr[1];
          if (tempArr[1].length > decimalMaxLen) {
            decimal = decimal.slice(0, decimalMaxLen);
          }
          value = `${numberValue}.${decimal}`;
        }
      }
    } else if (isIntNumber) {
      value = value.replace(numberTest, '');
      if (value.length > maxLen) {
        value = value.slice(0, maxLen);
      }
    }
    this.setState({
      value,
    });
    if (onChange) {
      onChange(e);
    }
  }

  render() {
    const { ...moreProps } = this.props;
    const { value } = this.state;
    return (
      <Input
        {...moreProps}
        value={value}
        onChange={this.changeInput}
        placeholder="number-input"
        className="components-numberinput-container"
      />
    );
  }
}
