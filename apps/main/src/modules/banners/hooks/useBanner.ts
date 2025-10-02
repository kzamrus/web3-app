import { useDispatch, useSelector } from 'react-redux';
import { closeBanner, selectClosedBannersState } from '../store/bannersSlice';

interface IUseBanner {
  isActive: boolean;
  onCloseClick: () => void;
}

export function useBanner(bannerName: string): IUseBanner {
  const bannersState = useSelector(selectClosedBannersState) || [];
  const dispatch = useDispatch();

  const isClosed = bannersState.some(banner => banner.name === bannerName);

  const onCloseClick = () => {
    dispatch(closeBanner({ name: bannerName, closedAt: Date.now() }));
  };

  return {
    isActive: !isClosed,
    onCloseClick,
  };
}
