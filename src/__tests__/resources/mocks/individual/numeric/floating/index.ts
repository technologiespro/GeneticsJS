/*
 * @license
 * Copyright (c) 2019 Cristian Abrante. All rights reserved.
 * Licensed under the MIT License. See LICENSE in the project root for license information.
 */

import FloatingIndividualMock from './FloatingIndividualMock';
import * as IntegerMock from './data';

interface Mock {
  [key: string]: FloatingIndividualMock;
}

const mocks: Mock = {
  ...IntegerMock,
};

export default mocks;
