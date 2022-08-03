/*
 * If not stated otherwise in this file or this component's LICENSE file the
 * following copyright and licenses apply:
 *
 * Copyright 2020 Metrological
 *
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {ColorShift} from "./index";

export default class AchromatopsiaShader extends ColorShift { }

AchromatopsiaShader.fragmentShaderSource = `
    ${ColorShift.before}
    vec4 filter( vec4 color )
    {
        float grey = dot(color.rgb, vec3(0.299, 0.587, 0.114));
        return vec4(vec3(grey, grey, grey), 1.0 );
    }

    vec4 vision(vec4 color)
    {
        return color;
    }
    ${ColorShift.after}
`;
