import { UilBagAlt, UilCreateDashboard } from '@iconscout/react-unicons';
import { Menu } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import UilEllipsisV from '@iconscout/react-unicons/icons/uil-ellipsis-v';
import propTypes from 'prop-types';

function MenuItems({ toggleCollapsed }) {
  const { t } = useTranslation();

  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }

  const { topMenu } = useSelector((state) => {
    return {
      topMenu: state.ChangeLayoutMode.topMenu,
    };
  });

  const path = '/admin';

  const pathName = window.location.pathname;
  const pathArray = pathName.split(path);
  const mainPath = pathArray[1];
  const mainPathSplit = mainPath.split('/');

  const [openKeys, setOpenKeys] = React.useState(
    !topMenu ? [`${mainPathSplit.length > 2 ? mainPathSplit[1] : 'dashboard'}`] : [],
  );

  const onOpenChange = (keys) => {
    setOpenKeys(keys[keys.length - 1] !== 'recharts' ? [keys.length && keys[keys.length - 1]] : keys);
  };

  const onClick = (item) => {
    if (item.keyPath.length === 1) setOpenKeys([]);
  };

  const items = [
    getItem(
      <NavLink to="/">{t('dashboard')}</NavLink>,
      'dashboard',
      !topMenu && (
        <NavLink className="menuItem-iocn" to="/">
          <UilCreateDashboard />
        </NavLink>
      ),
    ),
    // getItem(
    //   !topMenu && (
    //     <NavTitle className="flex text-[12px] font-medium uppercase text-light mt-[20px] dark:text-white87 p-0">
    //       {t('application')}
    //     </NavTitle>
    //   ),
    //   'app-title',
    //   null,
    //   null,
    //   'group',
    // ),

    getItem(t('product'), 'product', !topMenu && <UilBagAlt />, [
      getItem(
        <NavLink onClick={toggleCollapsed} to={`${path}/products/list`}>
          {t('products')} {t('list')}
        </NavLink>,
        'products',
        null,
      ),
      getItem(
        <NavLink onClick={toggleCollapsed} to={`${path}/brand`}>
          {t('brands')}
        </NavLink>,
        'brands',
        null,
      ),
      getItem(
        <NavLink onClick={toggleCollapsed} to={`${path}/category`}>
          {t('category')} {t('list')}
        </NavLink>,
        'categories',
        null,
      ),
    ]),
  ];

  return (
    <Menu
      onOpenChange={onOpenChange}
      onClick={onClick}
      mode={!topMenu || window.innerWidth <= 991 ? 'inline' : 'horizontal'}
      defaultSelectedKeys={
        !topMenu
          ? [
              `${
                mainPathSplit.length === 1 ? 'home' : mainPathSplit.length === 2 ? mainPathSplit[1] : mainPathSplit[2]
              }`,
            ]
          : []
      }
      defaultOpenKeys={!topMenu ? [`${mainPathSplit.length > 2 ? mainPathSplit[1] : 'dashboard'}`] : []}
      overflowedIndicator={<UilEllipsisV />}
      openKeys={openKeys}
      items={items}
    />
  );
}

MenuItems.propTypes = {
  toggleCollapsed: propTypes.func,
};

export default MenuItems;
