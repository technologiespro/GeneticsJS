/*
 * @license
 * Copyright (c) 2019 Cristian Abrante. All rights reserved.
 * Licensed under the MIT License. See LICENSE in the project root for license information.
 */

import BinaryReaderData from '../../resources/mocks/reader/data/BinaryReaderData';
import ReaderTestSuite from '../../resources/suites/reader/ReaderTestSuite';

import { BinaryReader } from '../../../index';

const reader = new BinaryReader();
ReaderTestSuite(reader, BinaryReaderData);
