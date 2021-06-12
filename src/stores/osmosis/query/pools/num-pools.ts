import { ObservableChainQuery } from '@keplr-wallet/stores/build/query/chain-query';
import { NumPools } from './types';
import { ChainGetter } from '@keplr-wallet/stores';
import { KVStore } from '@keplr-wallet/common';
import { computed, makeObservable } from 'mobx';
import { computedFn } from 'mobx-utils';

export class ObservableQueryNumPools extends ObservableChainQuery<NumPools> {
	constructor(kvStore: KVStore, chainId: string, chainGetter: ChainGetter) {
		super(kvStore, chainId, chainGetter, '/osmosis/gamm/v1beta1/num_pools');

		makeObservable(this);
	}

	@computed
	get numPools(): number {
		if (!this.response) {
			return 0;
		}

		return parseInt(this.response.data.numPools);
	}

	readonly computeNumPages = computedFn((itemsPerPage: number): number => {
		const numPools = this.numPools;
		if (!numPools) {
			return 1;
		}

		return Math.ceil(numPools / itemsPerPage);
	});
}
