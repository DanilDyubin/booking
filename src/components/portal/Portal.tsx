import { createPortal } from 'react-dom';
import { ReactNode, useState, useLayoutEffect } from 'react';

interface PortalProps {
  children: ReactNode;
  containerId?: string;
}

const createContainerAndAppendToBody = (containerId: string) => {
  const containerElement = document.createElement('div');
  containerElement.setAttribute('id', containerId);
  containerElement.setAttribute('class', 'modal');
  document.body.append(containerElement);
  return containerElement;
};

const Portal = ({ children, containerId = 'portal-container' }: PortalProps) => {
  const [containerElement, setContainerElement] = useState<HTMLElement | null>(null);

  useLayoutEffect(() => {
    let element = document.getElementById(containerId);
    let created = false;

    if (!element) {
      created = true;
      element = createContainerAndAppendToBody(containerId);
    }

    setContainerElement(element);

    return () => {
      if (created) {
        element?.remove();
      }
    };
  }, [containerId]);

  if (containerElement === null) return null;

  return createPortal(children, containerElement);
};

export default Portal;
