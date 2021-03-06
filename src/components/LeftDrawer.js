import React,  { PropTypes } from 'react';
import Drawer from 'material-ui/Drawer';
import {grey900} from 'material-ui/styles/colors';
import {Link} from 'react-router';
import { ListItem } from 'material-ui';

const LeftDrawer = (props) => {
  let { navDrawerOpen } = props;

  const styles = {
    // logo: {
    //   cursor: 'pointer',
    //   fontSize: 22,
    //   color: typography.textFullWhite,
    //   lineHeight: `${spacing.desktopKeylineIncrement}px`,
    //   fontWeight: typography.fontWeightLight,
    //   backgroundColor: blue500,
    //   paddingLeft: 40,
    //   height: 56,
    // },
    menuItem: {
      color: grey900,
      fontSize: 14
    },
    // avatar: {
    //   div: {
    //     padding: '15px 0 20px 15px',
    //     backgroundImage:  'url(' + require('../images/banner_nc.jpg') + ')',
    //     height: 45
    //   },
    //   icon: {
    //     float: 'left',
    //     display: 'block',
    //     marginRight: 15,
    //     boxShadow: '0px 0px 0px 8px rgba(0,0,0,0.2)'
    //   },
    //   span: {
    //     paddingTop: 12,
    //     display: 'block',
    //     color: 'white',
    //     fontWeight: 300,
    //     textShadow: '1px 1px #444'
    //   }
    // }
  };

  const admin = localStorage.getItem('admin');

  return (
    <Drawer
      docked={true}
      open={navDrawerOpen}>
        {/* <div style={styles.logo}>
          Administrador
        </div> */}
        {/* <div style={styles.avatar.div}> */}
          {/* <Avatar src="http://www.material-ui.com/images/uxceo-128.jpg" */}
          {/* <Avatar src="../images/brandon.jpeg"
                  size={50}
                  style={styles.avatar.icon}/>
          <span style={styles.avatar.span}>{props.username}</span> */}
        {/* </div> */}
        {/* <div>
          {props.menus.map((menu, index) => {
            
            return  (<ListItem
                      key={index}
                      style={styles.menuItem}
                      primaryText={menu.text}
                      leftIcon={menu.icon}
                      containerElement={<Link to={menu.link}/>}
                    />);

          }
          )}
        </div> */}
        <div>
          {
            admin
              ? props.menus.map((menu, index) => {
        
                  return  (<ListItem
                            key={index}
                            style={styles.menuItem}
                            primaryText={menu.text}
                            leftIcon={menu.icon}
                            containerElement={<Link to={menu.link}/>}
                          />);

                })
              : props.menus.map((menu, index) => {
                  if ( !menu.admin )
                    return  (<ListItem
                              key={index}
                              style={styles.menuItem}
                              primaryText={menu.text}
                              leftIcon={menu.icon}
                              containerElement={<Link to={menu.link}/>}
                            />);

                  })
          }
        </div>
        <div>
          <img style={{
            height: 248,
            position: "absolute",
            left: -20
          }} src="/images/banner_nc.jpg" />
        </div>
    </Drawer>
  );
};

LeftDrawer.propTypes = {
  navDrawerOpen: PropTypes.bool,
  menus: PropTypes.array,
  username: PropTypes.string,
};

export default LeftDrawer;
