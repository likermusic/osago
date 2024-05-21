export type StepItem = {
  title: ((vehicleType: VehicleType) => string) | string;
  stepIndex: 1 | 2 | 3 | 4;
  icon: {
    width: number;
    height: number;
    IconComponent: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  };
};
