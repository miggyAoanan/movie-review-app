import React from 'react'
import MediaQuery from 'react-responsive';
import BaseActorModalWrapper, { BaseActorModalWrapperProps } from './BaseActorModalWrapper';

import { DesktopCloseButton, DesktopModalContainer, MobileCloseButton, MobileModalContainer } from './ModalPopup.styles';

type ActorModalRWDProps = BaseActorModalWrapperProps;


const ActorModalRWD: React.FC<ActorModalRWDProps> = (props) => {
    return (<MediaQuery minWidth={580}>
        {matches => matches ? (
            <BaseActorModalWrapper 
              CloseButtonComponent={DesktopCloseButton}
              ContainerComponent={DesktopModalContainer}
              {...props}
            />
        ) : (

          <BaseActorModalWrapper 
            CloseButtonComponent={MobileCloseButton}
            ContainerComponent={MobileModalContainer}
          {...props}
        />
        )
      }
      </MediaQuery>);
}

export default ActorModalRWD