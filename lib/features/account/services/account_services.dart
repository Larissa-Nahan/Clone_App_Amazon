import 'dart:convert';

import 'package:amazon/constants/error_handling.dart';
import 'package:amazon/constants/global_variables.dart';
import 'package:amazon/constants/utils.dart';
import 'package:amazon/models/order.dart';
import 'package:amazon/providers/user_provider.dart';
import 'package:flutter/cupertino.dart';
import 'package:provider/provider.dart';
import 'package:http/http.dart' as http;

class AccountServices {
  Future<List<Order>> fetchMyOrders({
    required BuildContext context,
  }) async {
    final userProvider = Provider.of<UserProvider>(context, listen: false);
    List<Order> orderList = [];

    try {
      http.Response res = await http.get(
        Uri.parse('$uri/api/orders/me'),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'x-auth-token': userProvider.user.token,
        },
      );

      httpErrorHandle(
        response: res,
        context: context,
        onSuccess: () {
          for (int i = 0; i < jsonDecode(res.body).length; i++) {
            orderList.add(
              Order.fromJson(
                jsonEncode(jsonDecode(res.body)[i]),
              ),
            );
          }
        },
      );
    } catch (e) {
      showSnackBar(context, e.toString());
    }

    return orderList;
  }
}