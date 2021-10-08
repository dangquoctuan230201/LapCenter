import React from 'react';
import './footer.scss';
import { Button, Icon } from 'semantic-ui-react';

function Footer() {
  return (
    <div className="footer">
      <div className='footer-content'>
        <div className="footer-info">
          <span>Thông tin chung</span>
          <ul>
            <li>Giới thiệu về công ty</li>
            <li>Tin tuyển dụng</li>
            <li>Liên hệ, góp ý</li>
            <li>Tin tức</li>
          </ul>
        </div>
        <div className="footer-location">
          <span>Chi nhánh</span>
          <ul>
            <li>152 ABC, Thanh Khê, TP. Đà Nẵng</li>
            <li>162 ABC, Thanh Khê, TP. Đà Nẵng</li>
            <li>172 ABC, Thanh Khê, TP. Đà Nẵng</li>
          </ul>
        </div>
        <div className="footer-social">
          <span>Liên lạc</span>
          <br />
          <div className="footer-icon">
            <Button circular color='facebook' icon='facebook'  />
            <Button circular color='youtube' icon='youtube'  />
            <Button circular color='linkedin' icon='linkedin' />
            <Button circular color='google plus' icon='google plus' />
          </div>
        </div>
      </div>
      <p className="designer">Designed by Quoc Tuan</p>
    </div>
  )
}
export default Footer;
