import React from 'react';
import {View, Text} from 'react-native';
import {BarChart} from 'react-native-gifted-charts';

const GroupedBars = () => {
    const barData = [
        {
          value: 6000,
          label: 'Qtr 1',
          spacing: 2,
          labelWidth: 33,
          labelTextStyle: {color: 'gray'},
          frontColor: '#243B86',
          alignItems:'start',
        },
        {value: 4000, frontColor: '#009FFD'},
        {
          value: 4000,
          label: 'Qtr 2',
          spacing: 2,
          labelWidth: 33,
          labelTextStyle: {color: 'gray'},
          frontColor: '#243B86',
        },
        {value: 2000, frontColor: '#009FFD'},
        {
          value: 8000,
          label: 'Qtr 3',
          spacing: 2,
          labelWidth: 33,
          labelTextStyle: {color: 'gray'},
          frontColor: '#243B86',
        },
        {value: 6000, frontColor: '#009FFD'},
        {
          value: 7000,
          label: 'Qtr 4',
          spacing: 2,
          labelWidth: 33,
          labelTextStyle: {color: 'gray'},
          frontColor: '#243B86',
        },
        {value: 3000, frontColor: '#009FFD'},
      ];

      const renderTitle = () => {
          return(
            <View>
            <Text
              style={{
                color: 'black',
                fontSize: 20,
                fontWeight: 'bold',
              }}>
              Месячный график
              </Text>
              <Text
                style={{
                marginTop: 10,
                color: '#1D1F22',
                fontSize: 12,
                fontWeight: 400,
                opacity: 0.7,
                marginBottom: 15,
              }}>
              Отслеживайте ваши доходы и расходы
            </Text>
          </View>
          )
      }

    return (
        <View
        style={{
          backgroundColor: 'white',
          borderColor: 'black',
          borderRadius: 12,
          marginBottom: 26,
          paddingHorizontal: 16,
          paddingTop: 14,
          height: 350,
        }}>
        {renderTitle()}
            <BarChart
            data={barData}
            barWidth={9}
            spacing={50}
            roundedTop
            roundedBottom
            hideRules
          xAxisThickness={0}
            yAxisThickness={0}
            yAxisTextStyle={{color: '#1D1F22'}}
            noOfSections={10}
          maxValue={9000}
          initialSpacing={40}
          stepValue={1000}
          showReferenceLine1
          referenceLine1Position={2000}
          referenceLine1Config={{
            color: 'gray',
            dashWidth: 2,
            dashGap: 3,
          }}
          showReferenceLine2
          referenceLine2Position={4000}
          referenceLine2Config={{
            color: 'gray',
            dashWidth: 2,
            dashGap: 3,
          }}
          showReferenceLine3
          referenceLine3Position={6000}
          referenceLine3Config={{
            color: 'gray',
            dashWidth: 2,
            dashGap: 3,
            }}
        />
              <View
              style={{
                flex: 1,
                flexDirection: 'row',
            justifyContent: 'space-evenly',
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View
                  style={{
                    height: 12,
                    width: 12,
                    borderRadius: 6,
                    backgroundColor: '#243B86',
                marginRight: 8,
                marginLeft: 50,
                  }}
                />
                <Text
                  style={{
                    width: 60,
                    height: 16,
                color: 'lightgray',
                                    
                  }}>
                  Доходы
                </Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View
                  style={{
                    height: 12,
                    width: 12,
                    borderRadius: 6,
                    backgroundColor: '#009FFD',
                marginRight: 8,
                
                    
                  }}
                />
                <Text
                  style={{
                    width: 60,
                    height: 16,
                color: 'lightgray',
                
                    
                  }}>
                  Расходы
                </Text>
              </View>
            </View>
      </View>
    );
};

export default GroupedBars;
