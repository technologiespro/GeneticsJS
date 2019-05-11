/*
 * @license
 * Copyright (c) 2019 Cristian Abrante. All rights reserved.
 * Licensed under the MIT License. See LICENSE in the project root for license information.
 */

import { Generator } from '../../generator/utils';
import MutableIndividual from '../../individual/base/MutableIndividual';
import { NumericRange } from '../../individual/numeric/base';
import Crossover, { CrossoverParams, IndividualConstructor } from './Crossover';

export interface NPointsCrossoverParams<I extends MutableIndividual<T>, T> extends CrossoverParams<I, T> {
  numberOfCrossoverPoints: number;
}

class NPointsCrossover<I extends MutableIndividual<T>, T> implements Crossover<I, T, NPointsCrossoverParams<I, T>> {
  private crossoverPointsRange: NumericRange = NumericRange.DEFAULT;

  public cross(
    firstParent: I,
    secondParent: I,
    numberOfCrossoverPoints: number,
    individualConstructor: IndividualConstructor<I, T>,
    engine = Generator.DEFAULT_ENGINE,
  ): I[] {
    return this.crossWith(firstParent, secondParent, {
      engine,
      individualConstructor,
      numberOfCrossoverPoints,
    });
  }

  public crossWith(firstParent: I, secondParent: I, params: NPointsCrossoverParams<I, T>): I[] {
    this.checkParents(firstParent, secondParent);
    this.setCrossoverPointsRange(firstParent.length());
    this.checkCrossoverParams(params);

    const crossPoints = this.generateCrossoverPoints(params);
    const parents = [firstParent, secondParent];
    const genotypes: T[][] = [[], []];

    let lastIndex = 0;
    crossPoints.forEach((crossPoint, index) => {
      while (lastIndex < crossPoint) {
        const parentSelectionCondition: boolean = index % 2 === 0;
        genotypes[0].push(parents[parentSelectionCondition ? 0 : 1].get(lastIndex));
        genotypes[1].push(parents[parentSelectionCondition ? 1 : 0].get(lastIndex));
      }
      lastIndex += 1;
    });
    return [new params.individualConstructor(genotypes[0]), new params.individualConstructor(genotypes[1])];
  }

  private setCrossoverPointsRange(parentsLength: number) {
    this.crossoverPointsRange = new NumericRange(0, parentsLength - 1);
  }

  private checkParents(firstParent: I, secondParent: I) {
    if (firstParent.length() !== secondParent.length()) {
      throw new Error('NPointsCrossover: both parents must have the same length.');
    }
  }

  private checkCrossoverParams(params: NPointsCrossoverParams<I, T>) {
    if (NumericRange.isValueInRange(params.numberOfCrossoverPoints, this.crossoverPointsRange)) {
      throw new Error('NPointsCrossover: number of crossover points must be in range [0, length - 1]');
    }
  }

  private generateCrossoverPoints(params: NPointsCrossoverParams<I, T>): number[] {
    const crossoverPoints: number[] = [];
    while (crossoverPoints.length !== params.numberOfCrossoverPoints) {
      const point = Generator.generateInteger(this.crossoverPointsRange, params.engine);
      if (!crossoverPoints.includes(point)) {
        crossoverPoints.push(point);
      }
    }
    return crossoverPoints.sort();
  }
}

export default NPointsCrossover;
