import {
  IBannerState,
  selectClosedBannersState,
  setClosedBanners,
} from 'modules/banners/store/bannersSlice';
import { Milliseconds } from 'modules/common/types';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const SEVEN_DAYS: Milliseconds = 7 * 24 * 60 * 60 * 1000;
const MAX_CLOSED_TIME = SEVEN_DAYS;

export function CheckClosedBanners(): null {
  const dispatch = useDispatch();
  const closedBanners = useSelector(selectClosedBannersState);

  useEffect(() => {
    if (!closedBanners.length) {
      return;
    }

    const updatedData = closedBanners.filter(isNotExpired);

    dispatch(setClosedBanners(updatedData));
  }, []);

  return null;
}

function isNotExpired(claim: IBannerState): boolean {
  return Date.now() - claim.closedAt < MAX_CLOSED_TIME;
}
