export type HydraItem<T> = T & {
    '@id': string;
    '@type': string;
};

export type HydraCollection<T> = HydraItem<{
    '@context': string;
    'hydra:member': HydraItem<T>[];
    'hydra:totalItems': number;
    'hydra:view'?: HydraItem<{
        'hydra:first': string;
        'hydra:last': string;
        'hydra:next': string;
        'hydra:previous'?: string;
    }>;
}>;