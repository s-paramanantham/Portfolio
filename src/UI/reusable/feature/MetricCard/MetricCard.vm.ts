import { ScaleMetricBo } from '../../../../services/PortfolioService/bo/ScaleMetric.bo';

export interface UseMetricCardViewModelProps {
  readonly metric: ScaleMetricBo;
}

export interface UseMetricCardViewModelReturn {
  readonly metric: ScaleMetricBo;
}

export const useMetricCardViewModel = (
  props: UseMetricCardViewModelProps
): UseMetricCardViewModelReturn => {
  return {
    metric: props.metric,
  };
};
